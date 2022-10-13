
const tranlated = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
}

export const dayOfTheWeekTranslated = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const dayOfTheWeekTranslatedAbr = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export const timeAvailabilityToString = ({hours}) => {
    const daysInOrder = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    
    const days = [];
    for(const day of daysInOrder) {
        const hour = hours[day];
        if(hour!==null) days.push(tranlated[day]);
    }

    const last = days.pop();

    return { days: days.length > 0 ? `${days.join(', ')} y ${last}` : last }
}