import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CloudApiService } from './../../services/cloud-api.service';
import { CloudImageDetails } from '../../models/cloudImageDetails';
import { Keyword } from '../../models/keyword';

@Component({
  selector: 'app-cloud-form',
  templateUrl: './cloud-form.component.html',
  styleUrls: ['./cloud-form.component.scss']
})
export class CloudFormComponent implements OnInit {
  /** Cloud Image Reactive Form */
  public cloudForm: FormGroup;
  /** Keywords array store */
  public keywords: Keyword[];
  /** Changes after the first image is generated */
  public formBtnText: string;
  /** Base64 string from API */
  public imageBase64: string;
  /** Loading flag */
  public loading: boolean;
  /** Error message */
  private _errorMessage: string;

  constructor(private _formBuilder: FormBuilder, private _cloudApiService: CloudApiService) { }

  /**
   * Set button text
   * Load default keywords
   * Generate our reactive form
   */
  ngOnInit() {
    this.formBtnText = 'Generate';
    this.keywords = [
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
    ];

    this.createForm();
  }

  /**
   * Create our reactive form
   */
  public createForm(): void {
    this.cloudForm = this._formBuilder.group({
      theme: new FormControl('default', [Validators.required]),
      channel: new FormControl('linkedin', [Validators.required]),
      jobDescription: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
      jobTitle: new FormControl('', [Validators.maxLength(50)]),
      jobLocation: new FormControl('', [Validators.maxLength(50)]),
      newKeyword: new FormControl(''),
      newKeywordWeight: new FormControl('1')
    });
  }

  /**
   * Generate cloud image
   * Verify form requirements and pass onto API for generating
   */
  public generateCloudImage(): void {
    if (this._isFormValid()) {
      this.errorMessage = '';

      const newCloudImgDetails: CloudImageDetails = {
        theme: this.cloudForm.get('theme').value,
        channel: this.cloudForm.get('channel').value,
        jobDescription: this.cloudForm.get('jobDescription').value,
        jobTitle: this.cloudForm.get('jobTitle').value,
        jobLocation: this.cloudForm.get('jobLocation').value,
        keywords: this.keywords
      };

      this.loading = true;
      this.imageBase64 = '';

      this._cloudApiService.generateImage(newCloudImgDetails).subscribe(
        imageData => {
          this.imageBase64 = imageData;
          this.formBtnText = 'Generate Another';
          this.loading = false;
        },
        err => {
          this.loading = false;
          console.error(err);
        }
      );
    }
  }

  /**
   * Add keywords based on newKeyword and newKeywordWeight fields of cloudForm
   */
  public addKeyword(): void {
    if (this.cloudForm.controls.newKeyword.value) {
      const existIndex =
        this.keywords.findIndex(e => e.text === this.cloudForm.controls.newKeyword.value);

      if (existIndex >= 0) {
        this.keywords[existIndex].weight = this.cloudForm.controls.newKeywordWeight.value;
      } else {
        this.keywords.push({
          text : this.cloudForm.controls.newKeyword.value,
          weight : +this.cloudForm.controls.newKeywordWeight.value
        });
      }

      this.cloudForm.controls.newKeyword.setValue('');
      this.cloudForm.controls.newKeywordWeight.setValue(1);
    }
  }

  /**
   * Populate newKeyword and newKeywordWeight fields for editing by index
   * @param index Index of keywords
   */
  public loadKeyword(index: number): void {
    this.cloudForm.controls.newKeyword.setValue(this.keywords[index].text);
    this.cloudForm.controls.newKeywordWeight.setValue(this.keywords[index].weight);
  }

  /**
   * Remove keyword by index
   * @param index Index of keywords
   */
  public removeKeyword(index: number): void {
    this.keywords.splice(index, 1);
  }

  /**
   * Verify cloudForm fields.
   * If not valid, populate _errorMessage via setter based on where cloudForm is invalid
   */
  private _isFormValid(): boolean {
    if (this.cloudForm.valid) {
      return true;
    }

    if (this.cloudForm.controls.jobDescription.errors &&
        this.cloudForm.controls.jobDescription.errors.required) {
      this.errorMessage = `Please provide a job description`;
    }

    if (this.cloudForm.controls.jobDescription.errors &&
        this.cloudForm.controls.jobDescription.errors.maxlength) {
      this.errorMessage = `Job description maximum length is 5000 characters`;
    }

    if (this.cloudForm.controls.jobTitle.errors &&
        this.cloudForm.controls.jobTitle.errors.maxlength) {
      this.errorMessage = `Job title maximum length is 50 characters`;
    }

    if (this.cloudForm.controls.jobLocation.errors &&
        this.cloudForm.controls.jobLocation.errors.maxlength) {
      this.errorMessage = `Job location maximum length is 50 characters`;
    }

    return false;
  }

  /**
   * Get _errorMessage
   */
  get errorMessage(): string {
    return this._errorMessage;
  }

  /**
   * Set _errorMessage
   */
  set errorMessage(newError: string) {
    this._errorMessage = newError;
  }
}
