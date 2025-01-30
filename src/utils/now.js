/**
 * Gets the current formatted date and time.
 * 
 * @returns {string} The current date and time in the format "dd-mm-yyyy, hh:mm:ss AM/PM".
 */

const now = () => {
  const getDate = (date, separator = "-") => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}${separator}${month}${separator}${year}`;
  }
  const getTime = (date) => {
    const hour = String(date.getHours() % 12 || 12).padStart(2, '0');
    const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    //padStart(2, '0') is a string method that adds a 0 to the
    //left of the string if the string length is less than 2
    return `${hour}:${minute}:${second} ${meridiem}`;
  }
  const currentDate = new Date()
  return `${getDate(currentDate)}, ${getTime(currentDate)}`
}

export default now;