export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in Tweet',
      type: 'string',
    },
    {
      name: 'blocktweet',
      title: 'Block Tweet',
      description: 'ADMIN control : Toggle if tweet is deemed inappropraite',
      type: 'boolean',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string',
    },
    {
      name: 'imagePic',
      title: 'ImagePic',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
