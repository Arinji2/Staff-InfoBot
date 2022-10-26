export const headBoilerPlate = (headItems, head) => {
  headItems.push("<!DOCTYPE html>");
  headItems.push('<html lang="en">');
  headItems.push("<head>");
  headItems.push(
    '<link rel="icon" type="image/x-icon" href="/Pictures/favicon.ico" />'
  );
  headItems.push(
    '<meta name="viewport" content="width=device-width, initial-scale=0.7" />'
  );
  headItems.push("<title>InfoBot</title>");
  headItems.push('<link rel="stylesheet" href="styles.css" />');
  headItems.push("</head>");
  headItems.push("<body>");
  headItems.push('<h1 class="heading">' + head + "</h1>");
  headItems.push("<h3>What is a " + head + "?</h3>");
};

export const explainBoilerPlate = (explainItems, explain, head) => {
  explainItems.push('<div class="code">');
  explainItems.push('<h2 id="animate-info">Code For ' + head + "</h2>");
  explainItems.push("</div>");
  explainItems.push('<div class="container" id="animate-info">');
  explainItems.push('<div class="code-text" id="animate-info">');
};

export const logicBoilerPlate = (logicItems, logic, head) => {
  logicItems.push("</div>");
  logicItems.push("</div>");
  logicItems.push("</div>");
  logicItems.push(
    '<h3 class="logic-text" id="animate-info">' + logic + "</h3>"
  );
  logicItems.push("</div>");
  logicItems.push('<script src="scripts.js"></script>');
  logicItems.push("</body>");
  logicItems.push("</html>");
};
