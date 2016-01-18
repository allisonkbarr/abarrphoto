import {element} from 'deku';

export default {
  render({ context, dispatch }) {

    const up = () => dispatch({ type: 'UP'})

    return (
      <div>
        <p>{ context.number }</p>
        <button onClick={up} >UPWARDS!</button>
        <DownButton />
      </div>
    );
  }
}

const DownButton = {
  render({ dispatch }) {

    const down = () => dispatch({ type: 'DOWN'})

    return <button onClick={down} class="box">DOWNWARDS!</button>
  }
}
