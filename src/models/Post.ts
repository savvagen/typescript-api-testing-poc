
export interface Post {
    id?: number
    title: string
    subject: string
    body: string
    category: string
    user: number,
    comments: number[] // Array<number>
    createdAt: string
}
