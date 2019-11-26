import React, { Component } from 'react';
import 'babel-polyfill';
import './resources/style/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './sass/App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      mobileMenuActive: false,
      themeMenuActive: false,
      themeMenuVisited: false
    };

    this.version =
      require('../package.json') && require('../package.json').version;

    this.theme = 'nova-light';
    this.changeTheme = this.changeTheme.bind(this);
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onMenuButtonKeyDown = this.onMenuButtonKeyDown.bind(this);
    this.onSidebarClick = this.onSidebarClick.bind(this);
    this.onThemesLinkClick = this.onThemesLinkClick.bind(this);
    this.onThemesLinkKeyDown = this.onThemesLinkKeyDown.bind(this);
    this.onThemeChangerKeyDown = this.onThemeChangerKeyDown.bind(this);
    this.onThemesMenuRouteChange = this.onThemesMenuRouteChange.bind(this);
  }

  changeTheme(event, theme, dark) {
    let themeElement = document.getElementById('theme-link');
    themeElement.setAttribute(
      'href',
      themeElement.getAttribute('href').replace(this.theme, theme)
    );
    this.theme = theme;
    const hasBodyDarkTheme = this.hasClass(document.body, 'dark-theme');

    if (dark) {
      if (!hasBodyDarkTheme) {
        this.addClass(document.body, 'dark-theme');
      }
    } else if (hasBodyDarkTheme) {
      this.removeClass(document.body, 'dark-theme');
    }

    this.setState({
      themeMenuActive: false
    });
    this.unbindThemesMenuDocumentClickListener();
    event.preventDefault();
  }

  addClass(element, className) {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  }

  removeClass(element, className) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
  }

  hasClass(element, className) {
    if (element.classList) return element.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(
        element.className
      );
  }

  toggleMenu() {
    this.setState(
      {
        mobileMenuActive: !this.state.mobileMenuActive
      },
      () => {
        if (this.state.mobileMenuActive) this.bindMenuDocumentClickListener();
        else this.unbindMenuDocumentClickListener();
      }
    );
  }

  onMenuButtonClick() {
    this.toggleMenu();
  }

  onMenuButtonKeyDown(event) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }

  onSidebarClick(event) {
    if (event.target.nodeName === 'A') {
      this.setState({ mobileMenuActive: false });
    }
  }

  onThemesLinkClick() {
    this.setState(
      {
        themeMenuActive: !this.state.themeMenuActive,
        themeMenuVisited: true
      },
      () => {
        if (this.state.themeMenuActive)
          this.bindThemesMenuDocumentClickListener();
        else this.unbindThemesMenuDocumentClickListener();
      }
    );
  }

  onThemesLinkKeyDown(event) {
    if (event.key === 'Enter') {
      this.onThemesLinkClick();
    }
  }

  onThemeChangerKeyDown(event) {
    if (event.key === 'Enter') {
      event.target.click();
    }
  }

  onThemesMenuRouteChange() {
    this.setState({ themeMenuActive: false }, () => {
      this.unbindThemesMenuDocumentClickListener();
    });
  }

  bindMenuDocumentClickListener() {
    if (!this.menuDocumentClickListener) {
      this.menuDocumentClickListener = event => {
        if (
          !this.isMenuButtonClicked(event) &&
          !this.sidebar.contains(event.target)
        ) {
          this.setState({ mobileMenuActive: false });
          this.unbindMenuDocumentClickListener();
        }
      };

      document.addEventListener('click', this.menuDocumentClickListener);
    }
  }

  unbindMenuDocumentClickListener() {
    if (this.menuDocumentClickListener) {
      document.removeEventListener('click', this.menuDocumentClickListener);
      this.menuDocumentClickListener = null;
    }
  }

  isMenuButtonClicked(event) {
    return (
      event.target === this.menuButton || this.menuButton.contains(event.target)
    );
  }

  bindThemesMenuDocumentClickListener() {
    if (!this.themesMenuDocumentClickListener) {
      this.themesMenuDocumentClickListener = event => {
        if (
          this.themeMenu &&
          event.target !== this.themeMenuLink &&
          !this.themeMenu.contains(event.target)
        ) {
          this.setState({ themeMenuActive: null });
          this.unbindThemesMenuDocumentClickListener();
        }
      };

      document.addEventListener('click', this.themesMenuDocumentClickListener);
    }
  }

  unbindThemesMenuDocumentClickListener() {
    if (this.themesMenuDocumentClickListener) {
      document.removeEventListener(
        'click',
        this.themesMenuDocumentClickListener
      );
      this.themesMenuDocumentClickListener = null;
    }
  }

  componentWillUnmount() {
    this.unbindThemesMenuDocumentClickListener();
    this.unbindMenuDocumentClickListener();
  }

  render() {
    return <div />;
  }
}

export default App;
