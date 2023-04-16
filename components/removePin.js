import styles from '../styles/Home.module.css'

export default function RemovePin(props) {

  return (
    <svg
      viewBox="0 0 16 16"
      className={styles.titleMethodIcon}
      {...props}
    >
      <g transform="translate(-.350318 0)">
        <g transform="translate(0 0.000001)">
          <path d="M9.828,0.722c.132699-.000237.260049.052286.354.146l4.95,4.95c.195191.19525.195191.51175,0,.707-.48.48-1.072.588-1.503.588-.177,0-.335-.018-.46-.039l-3.134,3.134c.082502.33241.136035.671345.16,1.013.046.702-.032,1.687-.72,2.375-.19525.195191-.51175.195191-.707,0L5.939,10.768L2.757,13.95c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182L2.404,7.232c-.195191-.19525-.195191-.51175,0-.707.688-.688,1.673-.767,2.375-.72.341658.02394.680595.077474,1.013.16L8.926,2.832c-.026158-.152283-.039538-.306487-.04-.461c0-.43.108-1.022.589-1.503.093706-.093469.220648-.145972.353-.146ZM9.95,2.834v-.002.002Zm0-.002v.002c.058893.179399.011702.376673-.122.51L6.293,6.878c-.133954.133381-.331678.179813-.511.12h-.002l-.014-.004c-.095136-.0285-.191189-.053847-.288-.076-.251561-.058681-.507351-.097467-.765-.116-.422-.028-.836.008-1.175.15l5.51,5.509c.141-.34.177-.753.149-1.175-.025475-.357271-.089856-.710696-.192-1.054l-.004-.013v-.001c-.060227-.179618-.013767-.377849.12-.512l3.536-3.535c.139105-.139951.34751-.185001.532-.115l.096.022c.087.017.208.034.344.034.114,0,.23-.011.343-.04L9.927,2.028c-.029.113-.04.23-.04.343.000489.155383.021333.310032.062.46Z" />
        </g>
      </g>
      <line x1="-7.031228" y1="-7.064879" x2="7.031228" y2="7.064879" transform="matrix(1 0.000124-.000124 1 7.949693 8.000323)" fill="none" stroke={props.customStrokeColor} stroke-width="1.8" />
    </svg>
  )

}