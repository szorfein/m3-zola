const emitter = mitt();

window.addEventListener('popstate', () => {
  emitter.emit('navigate');
});

const postComponent = {
  name: 'post-component',
  template: `<h1>Post Displaying</h1>`
}

const postListComponent = {
  name: 'post-list-component',
  props: ['title', 'content', 'link'],
  template: `<v-card class="mx-auto"
                     max-width="500"
                     :title="title"
                     :text="content">
              <v-card-actions>
                <v-btn variant="outlined" @click="navigate"
                       :href="link">{{ link }}</v-btn>
              </v-card-actions>
              </v-card>`,
  methods: {
    navigate(evt) {
      evt.preventDefault();
      window.history.pushState(null, null, this.link);
      emitter.emit('navigate');
    }
  }
}

const routes = [
  {
    path: '/blog/',
    component: postListComponent,
  },
  { path: '/blog/first-post', component: postComponent },
];

const View = {
  name: 'router-view',
  template: `<component :is="currentView"></component>`,
  data() {
    return {
      currentView: {}
    };
  },
  created() {
    if (this.getRouteObject() === undefined) {
      this.currentView = {
        template: `<p>No found ` + window.location.pathname + `</p>`
      };
    } else {
      this.currentView = this.getRouteObject().component;
    }
    emitter.on('navigate', () => {
      this.currentView = this.getRouteObject().component;
    });
  },
  methods: {
    getRouteObject() {
      return routes.find(route => route.path === window.location.pathname);
    }
  }
};

const Link = {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    },
  },
  template: `<a @click="navigate" :href="to">{{ to }}</a>`,
  methods: {
    navigate(evt) {
      evt.preventDefault();
      window.history.pushState(null, null, this.to);
      emitter.emit('navigate');
    }
  }
};

const App = {
  name: 'posts-route',
  components: {
    'router-view': View,
    'router-link': Link,
    'post-list-component': postListComponent,
  }
};

export default App;
