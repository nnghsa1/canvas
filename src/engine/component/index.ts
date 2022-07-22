
export default class Component {
  events: any[];
  constructor() {
    this.events = [];
  }

  triggerEvent(e: any) {
    this.events.forEach((event) => {
      if (event.name === e.type) {
        event.fn(e);
      }
    })
  }
}