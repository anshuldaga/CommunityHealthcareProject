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
    description: string;
    testRach: pageVideoSection[];
}

