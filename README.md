# AgorApp

This is a social media web & mobile app focused on connecting people who are
close-by, based on their interests.

The main view of the app (app/page.tsx) is a map that's centered on the user's
current location. (the user's location is not displayed by default to other
users, but they are free to share it.) The main feature to interact with are
_places_, which are locations placed on the map. Places can be point-like (just
pins on the map), path-like (an open string of pins) or area-like (a closed
path). User can usually mark their own places on the map, although rules may
vary.

similarly, there isn't a single map, but rather a number of _Universes_. an
Universe is its own instance of the map with its own Places. Users can be
members of any number of Universes. Universes can be public or private (of some
User), who then act as admins to these Universes.

Upon registering with the app, Users will be requested to say their
_Interests_. These could be sports, arts, dancing, etc. There can also be
sub-interests, like specific sports (football, baseball, etc.), down to
individual players.

Finally, therre may also be _Events_ taking place on any Universe. Users may
attend these Events.
