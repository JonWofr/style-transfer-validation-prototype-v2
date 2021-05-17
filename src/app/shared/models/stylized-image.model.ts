import { DocumentReference } from "@angular/fire/firestore";
import { StylizationJob } from "./stylization-job.model";

export interface StylizedImage {
    stylizationJob: DocumentReference<StylizationJob>
    publicUrl: string,
    mugPreviewImagePublicUrl: string,
    doesLike: boolean | null
}