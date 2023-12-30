declare var GemBookPluginElement: typeof import('gem-book').GemBookPluginElement

const { Gem } = GemBookPluginElement
const { html } = Gem

type State = {
  data?: typeof import('./partners.json')
}

class MyPlugin extends GemBookPluginElement<State> {
  constructor() {
    super({ isLight: true })
  }

  state: State = {}

  mounted = async () => {
    this.setState({
      data: (await (
        await fetch(this.getRemoteURL('src/partners/partners.json'))
      ).json()) as typeof import('./partners.json')
    })
  }

  render() {
    const { data } = this.state
    if (!data) return html``

    return html`
      ${data.map(
        (obj) => html`
          <gem-book-pre codelang="json"
            >${JSON.stringify(obj, null, 2)}</gem-book-pre
          >
        `
      )}
    `
  }
}

customElements.define('partner-landing', MyPlugin)
