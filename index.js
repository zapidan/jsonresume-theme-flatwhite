const fs = require('fs');
const handlebars = require('handlebars');
const handlebarsWax = require('handlebars-wax');
const moment = require('moment');

handlebars.registerHelper({
  removeProtocol: url => url.replace(/.*?:\/\//g, ''),
  concat: (...args) => args.filter(arg => typeof arg !== 'object').join(''),
  // Arguments: {address, city, subdivision, postalCode, countryCode}
  // formatAddress: (...args) => addressFormat(args).join(' '),
  formatAddress: (...args) => args.filter(arg => typeof arg !== 'object').join(' '),
  formatDate: date => moment(date).format('MMM YYYY'),
  lowercase: s => s.toLowerCase(),
  eq: (a, b) => a === b,
});

// Creates a string representation of the duration in a role in the format `1 yrs 10 mos'
function getDurationString(startDateString, endDateString) {
  const endDate = endDateString ? moment(endDateString) : moment();
  const delta = moment.duration(endDate.diff(startDateString));
  return `${delta.years()} yrs ${delta.months()} mos`;
}

// Groups Positions by Company for presentation purposes
function groupPositionsByCompany(work) {
  let companies = [];

  for (const position of work) {

    // Is this a company that we've seen before?
    if (!companies[position.name]) {
      companies[position.name] = {...position, positions: []};
    }
    
    // Calculate the duration in the role
    const durationInRole = getDurationString(position.startDate, position?.endDate);

    // Associate the role with the specified company
    companies[position.name].positions.push({...position, duration: durationInRole});

    // Update the cumulative start and end dates overall for the specific company, and calculate the overall duration
    companies[position.name].startDate = moment.min(moment(position.startDate), moment(companies[position.name].startDate)).format('YYYY-MM');
    companies[position.name].endDate = moment.max(moment(position.endDate), moment(companies[position.name].endDate)).format('YYYY-MM');
    companies[position.name].duration = getDurationString(companies[position.name].startDate, companies[position.name]?.endDate);
  }

  let retVal = [];
  for (const key in companies) {
    retVal.push(companies[key]);
  }
  
  return retVal;
}

function render(resume) {
  resume.work = groupPositionsByCompany(resume.work);

  const dir = `${__dirname}/src`;
  const css = fs.readFileSync(`${dir}/style.css`, 'utf-8');
  const resumeTemplate = fs.readFileSync(`${dir}/resume.hbs`, 'utf-8');

  const Handlebars = handlebarsWax(handlebars);

  Handlebars.partials(`${dir}/partials/**/*.{hbs,js}`);

  return Handlebars.compile(resumeTemplate)({
    style: `<style>${css}</style>`,
    resume,
  });
}

module.exports = {
  render,
};
