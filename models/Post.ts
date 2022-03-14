

interface Post {
    id: number
    title: string
    subject: string
    body: string
    category: string
    user: number,
    comments: Array<number>
    createdAt: string
}