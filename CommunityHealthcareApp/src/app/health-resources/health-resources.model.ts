import { SafeResourceUrl } from '@angular/platform-browser';

export interface pageInfoSection
{
    infoTitle: string;
    infoDescription: string;
    infoDetails;
}

export interface ResourcesTab
{
    id: string;
    id2: string;
    pic: string;
    testBhar: pageInfoSection[];
}
