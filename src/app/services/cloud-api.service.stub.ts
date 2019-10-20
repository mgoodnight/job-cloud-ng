import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CloudImageDetails } from './../models/cloudImageDetails';

@Injectable({
    providedIn: 'root'
})
export class CloudApiServiceStub {

    public generateImage(imageDetails: CloudImageDetails): Observable<string> {
        return of('/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPU\
        jogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdW\
        FsaXR5ID0gNjUK/9sAQwALCAgKCAcLCgkKDQwLDREcEhEPDxEiGRo\
        UHCkkKyooJCcnLTJANy0wPTAnJzhMOT1DRUhJSCs2T1VORlRAR0hF\
        /9sAQwEMDQ0RDxEhEhIhRS4nLkVFRUVFRUVFRUVFRUVFRUVFRUVFR\
        UVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVF/8AAEQgACgAKAw\
        EiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAk\
        KC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQci\
        cRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5O\
        kNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiY\
        qSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09T\
        V1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEB\
        AQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECd\
        wABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJD\
        ThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmd\
        oaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKz\
        tLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29\
        /j5+v/aAAwDAQACEQMRAD8Azte0HyBHJbPFKHfc2xh6eh71sW9veN\
        bxMbiEEoCQ0vI478VkOTt61VLHPU/nXDK0tzblP//Z');
    }
}
