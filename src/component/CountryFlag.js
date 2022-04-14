import Flags from "country-flag-icons/react/3x2";

const nationality = {
    'monegasque': 'MC',
    'spanish': 'ES',
    'british': 'GB',
    'danish': 'DK',
    'finnish': 'FI',
    'french': 'FR',
    'japanese': 'JP',
    'chinese': 'CN',
    'german': 'DE',
    'australian': 'AU',
    'canadian': 'CA',
    'mexican': 'MX',
    'dutch': 'NL',
    'thai': 'TH',
    'russian': 'RU',
    'italian': 'IT',
    'brazilian': 'BR',
    'swedish': 'SE',
    'indonesian': 'ID',
    'polish': 'PL',
    'indian': 'IN',
    'swiss': 'CH',
    'venezuelan': 'VE'
}

export default function CountryFlag({name}){
   
    const unicode = nationality?.[name.toLowerCase()];
    const Flag = unicode ? Flags[unicode] : Flags['US'];

    return(<Flag className='flag-icon'/>)
}