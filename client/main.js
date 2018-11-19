import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker'
import 'semantic-ui-css/semantic.min.css'

import { routes, onAuthChange } from '../imports/routes/routes';

Tracker.autorun(() => {
  const authenticated = !!Meteor.userId();
  onAuthChange(authenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
