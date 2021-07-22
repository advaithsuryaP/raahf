
export class Book {
    constructor(
        public bookCategory: 'devotion' | 'finance' | 'entrepreneurship',
        public bookTitle: string,
        public bookAuthor: string,
        public bookTimeline: string, // year ~ 2019
        public bookDescription: string,
        public bookImage: string,
        public bookStatus: number, // Completed - In Progress - Yet to start
        public chapters: Chapter[] 
    ) {}
}

export class Chapter {
    constructor(
        public chapterName: string,
        public chapterDescription: string,
        public keyPoints: string[]
    ) {}
}