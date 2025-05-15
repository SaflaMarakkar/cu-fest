export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'geopoint',
      title: 'Geopoint',
      type: 'geopoint',
    }
  ],
}