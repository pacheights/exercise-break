## Exercise Break

**Exercise Break** is a Chrome extension that breaks up your workouts into
chunks throughout your work day. It'll notify you based on the interval you set.

|                   Workout Settings                   |                   Workout Notification                   |
| :--------------------------------------------------: | :------------------------------------------------------: |
| ![Workout settings](https://i.imgur.com/SJp1iMv.png) | ![Workout notification](https://i.imgur.com/qCwCpQb.png) |

### Stack

**Exercise Break** is built in the Chrome extension framework but with React as
the frontend framework. This decision was made because there were many
component-like elements and so going with a component-oriented framework made
sense. Styling is done with `styled-components`. All build files (JS and CSS)
are merged into one `main.js` and one `main.css` file to fit within the
popup/content script conventions. Component library being used is
[Bulma](http://bulma.io/documentation/elements/).

### How to run locally

The following steps should allow you to run the app locally (`yarn` is
prerequisite):

- `yarn install` or `npm install` to get dependencies
- Make sure `localEnv` in **./src/util/constants** is set to `true`
- `yarn start`

To view the **Workout Settings**, have this comment uncommented in
**./src/index.js**:

```
ReactDOM.render(
	<React.StrictMode>
		<App  />
	</React.StrictMode>,
	insertionPoint
);
```

To view the **Workout Notification**, have this comment uncommented in
**./src/index.js**:

```
ReactDOM.render(
	<React.StrictMode>
		<Alert  />
	</React.StrictMode>,
	insertionPoint
);
```

Then, in **.src/views/Alert.js**, set the initial `useState` to true
`const [visible, setVisible] = useState(false);` and add this boilerplate
exercise (format is `[label, perSet]`)
`const [workouts, setWorkouts] = useState([['Push Ups', 15]);`

### How to build

In the parent directory, run `yarn build:extension`. The **./build** folder _is_
the extension — this is what you unpack in `chrome://extensions`. Make sure
`localEnv` is set to `false` first.
