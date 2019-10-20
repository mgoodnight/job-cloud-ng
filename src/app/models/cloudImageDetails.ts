import { Keyword } from './keyword';

export interface CloudImageDetails {
    theme: string;
    channel: string;
    jobTitle?: string;
    jobLocation?: string;
    jobDescription?: string;
    keywords: Keyword[];
}
