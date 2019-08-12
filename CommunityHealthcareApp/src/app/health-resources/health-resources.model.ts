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
    testBhar: pageInfoSection[];
}
