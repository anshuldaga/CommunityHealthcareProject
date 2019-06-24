import { SafeResourceUrl } from '@angular/platform-browser';

export interface pageVideoSection
{
    videoTitle: string;
    videoDescription: string;
    videoUrl: SafeResourceUrl;
}

export interface EducationTab
{
    id: string;
    title: string;
    description1: string;
    description2: string;
    description3: string;
    image: string;
    testRach: pageVideoSection[];
}

