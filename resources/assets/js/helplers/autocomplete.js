import algolia from 'algoliasearch'
import autocomplete from 'autocomplete.js'

var index = algolia('AGPD78DEL9', 'ab54d3282dca8fa49fcd74c8b11f8ea7')

export const userautocomplete = selector => {
  let users = index.initIndex('users')
  return autocomplete(
    selector,
    {},
    {
      source: autocomplete.sources.hits(users, { hitsPerPage: 10 }),
      displayKey: 'name',
      templates: {
        suggestion: function (hit) {
          return (
            '<img class="rounded-circle profile-photo mr-1 pic" src="' +
            hit.photo_url +
            '" /><span class="name">' +
            hit._highlightResult.name.value +
            '<span>'
          )
        },
        empty: '<div class="aa-empty">No people found.</div>'
      }
    }
  )
}
