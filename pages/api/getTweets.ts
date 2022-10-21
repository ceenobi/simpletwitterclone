import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Tweet } from '../../types/type'

const feedQuery = groq`
*[_type == "tweet" && !blocktweet] {
    _id,
    ...
} | order(_createdAt desc)`

type Data = {
  tweets: Tweet[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery)
  res.status(200).json({ tweets })
}
