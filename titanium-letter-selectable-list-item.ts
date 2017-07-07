@customElement("titanium-letter-selectable-list-item")
class LetterSelectableListItem extends Polymer.GestureEventListeners(Polymer.Element) {
    @property()
    item: any;

    @property({ notify: true })
    selected: boolean = false;

    @property()
    heading: string;

    @property()
    headingTokens: Array<string> = [];

    @property()
    subHeading: string;

    @property()
    page: string = "picture";

    @property()
    list: Object;

    @property()
    isSelectable: Boolean;

    @property()
    cursor: string = "pointer";

    @property()
    searchTokens: Array<string> = []

    @gestureListen("tap", "card")
    onCardTap(e: any) {
        let options: any = { bubbles: true, composed: true, detail: e };
        this.dispatchEvent(new CustomEvent('card-tap', options));
    }

    @gestureListen("tap", "icon-button")
    toggleSelected(e: any) {
        e.stopPropagation();
        let options: any = { bubbles: true, composed: true, detail: this.item };
        this.dispatchEvent(new CustomEvent("item-selected", options));
    }

    @observe('selected')
    private selectedChanged(value: any) {
        this.page = this.selected ? "checkbox" : "picture";
    }

    @computed("iconComputedStyle")
    private iconSelectable(isSelectable: boolean) {
        return isSelectable ? " cursor: pointer" : "";
    }

    @observe('searchTokens, heading')
    headingChanged(searchTokens: any, heading: string) {
        if (searchTokens && searchTokens.length > 0 && typeof heading !== 'undefined') {

            var regExPart = searchTokens.map((token: string) => {
                return token.split('').join("[^string]*?")
            }).join("|");
            var regEx = new RegExp(regExPart, 'gi');
            var wordsToHighlight = heading.match(regEx) || [];

            var highlightedHeading = heading;
            wordsToHighlight.forEach((word: string) => {
                highlightedHeading = highlightedHeading.replace(word, `<span highlighted>${word}</span>`)
            });

            this.$.heading.innerHTML = highlightedHeading;
        }
        this.$.heading.innerHtml = [heading];
    }
}