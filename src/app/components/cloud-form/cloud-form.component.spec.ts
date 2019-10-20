import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockComponent } from 'ng2-mock-component';

import { ReactiveFormsModule } from '@angular/forms';
import { CloudFormComponent } from './cloud-form.component';
import { CloudApiService } from './../../services/cloud-api.service';
import { CloudApiServiceStub } from './../../services/cloud-api.service.stub';

describe('CloudFormComponent', () => {
  let component: CloudFormComponent;
  let fixture: ComponentFixture<CloudFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CloudFormComponent,
        MockComponent({
          selector: 'app-cloud-form'
        }),
        MockComponent({
          selector: 'app-image-container',
          inputs: ['imgData']
        })
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CloudApiService, useValue: CloudApiServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and createForm()', () => {
    expect(component).toBeTruthy();
    expect(component.formBtnText).toEqual('Generate');
    expect(component.keywords).toEqual([
      {
        text: 'Self-Starter',
        weight: 1
      },
      {
        text: 'Team Player',
        weight: 1
      },
      {
        text: 'Get Stuff Done',
        weight: 1
      }
    ]);

    expect(component.cloudForm.get('theme').value).toEqual('default');
    expect(component.cloudForm.get('channel').value).toEqual('linkedin');
  });

  it('generateCloudImage() description limits', () => {
    component.generateCloudImage();
    expect(component.imageBase64).toBe(undefined);
    expect(component.errorMessage).toEqual(`Please provide a job description`);

    let reallyLongDescription = ``;
    for (let i = 0; i <= 900; i++) {
      reallyLongDescription = reallyLongDescription.concat('foobar');
    }

    component.cloudForm.controls.jobDescription.setValue(reallyLongDescription);
    component.generateCloudImage();
    expect(component.imageBase64).toBe(undefined);
    expect(component.errorMessage).toEqual(`Job description maximum length is 5000 characters`);
  });

  it('generateCloudImage() job title', () => {
    component.cloudForm.controls.jobDescription.setValue('foobar');

    component.cloudForm.controls.jobTitle.setValue('foobarfoobarfoobarfoobarfoobarfoobarfoobarfoobarfoobarfoobar');
    component.generateCloudImage();

    expect(component.imageBase64).toBe(undefined);
    expect(component.errorMessage).toEqual(`Job title maximum length is 50 characters`);
  });

  it('generateCloudImage() location limit', () => {
    component.cloudForm.controls.jobDescription.setValue('foobar');

    component.cloudForm.controls.jobLocation.setValue('foobarfoobarfoobarfoobarfoobar\
                                                       foobarfoobarfoobarfoobarfoobar');
    component.generateCloudImage();

    expect(component.imageBase64).toBe(undefined);
    expect(component.errorMessage).toEqual(`Job location maximum length is 50 characters`);
  });

  it('addKeyword()', () => {
    // No newKeyword field value doesn't add anything
    component.keywords = [];
    component.addKeyword();
    expect(component.keywords.length).toBe(0);

    // Generic add keyword scenario
    component.cloudForm.controls.newKeyword.setValue('foobar');
    component.addKeyword();
    expect(component.keywords).toEqual([{ text: 'foobar', weight: 1 }]);

    // Try to add existing keyword
    component.cloudForm.controls.newKeyword.setValue('foobar');
    component.addKeyword();
    expect(component.keywords).toEqual([{ text: 'foobar', weight: 1 }]);

    // Try to add existing keyword with new weight - should update weight
    component.keywords = [{
      text: 'foobar',
      weight: 1
    }];
    component.cloudForm.controls.newKeyword.setValue('foobar');
    component.cloudForm.controls.newKeywordWeight.setValue(2);
    component.addKeyword();
    expect(component.keywords).toEqual([{ text: 'foobar', weight: 2 }]);
  });

  it('loadKeyword()', () => {
    component.keywords = [
      {
        text: 'foo',
        weight: 1
      }
    ];

    component.loadKeyword(0);

    expect(component.cloudForm.controls.newKeyword.value).toEqual('foo');
    expect(component.cloudForm.controls.newKeywordWeight.value).toEqual(1);
  });

  it('removeKeyword()', () => {
    component.keywords = [
      {
        text: 'foo',
        weight: 1
      },
      {
        text: 'bar',
        weight: 2
      }
    ];

    component.removeKeyword(0);

    expect(component.keywords).toEqual([
      {
        text: 'bar',
        weight: 2
      }
    ]);
  });
});
