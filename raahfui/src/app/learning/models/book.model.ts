
export class Book {
    constructor(
        public bookId: string | null,
        public bookCategory: 'devotion' | 'finance' | 'entrepreneurship',
        public bookTitle: string,
        public bookAuthor: string,
        public bookTimeline: string, // year ~ 2019 (or) 'Dwaparayugam'
        public bookDescription: string,
        public bookImage: string,
        public bookStatus: number, // Progress in terms of %
        public chapters: Chapter[] 
    ) {}
}

export class Chapter {
    constructor(
        public chapterId: string, // Verse
        public chapterName: string, // Meaning
        public chapterDescription: string,
        public keyPoints: string
    ) {}
}