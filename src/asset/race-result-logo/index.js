import {ReactComponent as Accident} from './accident.svg'
import {ReactComponent as CheckeredFlag} from './checkered-flag.svg'
import {ReactComponent as BlackFlag} from './black-flag.svg'
import {ReactComponent as BlueFlag} from './blue-flag.svg'
import {ReactComponent as Brakes} from './brakes.svg'
import {ReactComponent as Collision} from './collision.svg'
import {ReactComponent as Electrical} from './electrical.svg'
import {ReactComponent as Engine} from './engine.svg'
import {ReactComponent as Fuel} from './fuel.svg'
import {ReactComponent as Gearbox} from './gearbox.svg'
import {ReactComponent as Mechanical} from './mechanical.svg'
import {ReactComponent as SteeringWheel} from './steering-wheel.svg'

export const LOGO_MAP = {
    'accident': Accident,
    'collision' : Collision,
    'collision_damage' : Collision,
    'disqualified' : BlackFlag,
    'electrical' : Electrical,
    'electronics' : Electrical,
    'mechanical': Mechanical,
    'finished': CheckeredFlag,
    'lapped': BlueFlag,
    'engine': Engine,
    'steering': SteeringWheel,
    'power_unit': Engine,
    'power_loss': Engine,
    'fuel': Fuel,
    'fuel_pressure': Fuel,
    'fuel_system': Fuel,
    'gearbox': Gearbox,
    'transmission': Gearbox,
    'brakes': Brakes,
}