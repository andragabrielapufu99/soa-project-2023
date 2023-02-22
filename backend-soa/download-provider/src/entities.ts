export interface ReportRequest {
    id: number,
    email: string;
    date: string;
    type: ReportRequestType;
    pathFile?: string;
    link?: string;
    spectrograms: string[];
    results: ReportResult[];
    status: RequestStatusType;
}

export interface ReportResult {
    emotion: string;
    count: number;
}

export enum ReportRequestType {
    HISTORY=0,
    SONG=1,
    PLAYLIST=2
}

export enum RequestStatusType {
    UNPROCESSED=0,
    INPROGRESS=1,
    PROCESSED=2
}