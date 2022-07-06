# New Relic - Custom Visualization Boilerplate

This boilerplate aims to provide a quick start into NR1 custom visualization development.

Demonstrates the use of:
- Hooks: useState, useEffect
- NR1 components: NrqlQuery, PlatformState, NerdGraphQuery etc.
- Custom visualization configuration items
- Custom data polling
- Handling errors, loading, time pickers etc.

## Prerequisites
Follow the setup here:
https://one.newrelic.com/developer-center

## Getting started
Regenerate the UUID for your profile
```
nr1 nerdpack:uuid -gf --profile=MyProfile
```

Install dependencies and start
```
npm install
npm start
```

Visit https://one.newrelic.com/?nerdpacks=local and :sparkles: