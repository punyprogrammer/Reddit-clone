import { Timestamp } from 'firebase/firestore'
import { BsNodePlusFill } from 'react-icons/bs'
import { atom } from 'recoil'
export type Post = {
  id?: string
  communityId: string
  creatorId: string
  creatorDisplayName: string
  title: string
  body: string
  numberOfComments: number
  voteStatus: number
  imageURL?: string
  communitImageURL?: string
  createdAt: Timestamp
}
interface PostState {
  selectedPost: Post | null
  posts: Post[]
  // postVotes:
}
const defaultPostState: PostState = {
  selectedPost: null,
  posts: []
}
export const postState = atom<PostState>({
  key: 'postState',
  default: defaultPostState
})
