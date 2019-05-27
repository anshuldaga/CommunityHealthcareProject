import { SafeResourceUrl } from '@angular/platform-browser';

export interface EducationTab
{
    id: string;
    title: string;
    videoUrl: SafeResourceUrl;
    description: string;
    //trustedVideoUrl: SafeResourceUrl;
}