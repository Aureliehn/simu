const form = document.getElementById('command-form');
const validCommands = [
  'init',
  'add',
  'commit',
  'push',
  'pull',
  'clone',
  'reset',
  'revert',
  'log',
  'status',
  'rebase',
  'merge',
  'branch',
  'checkout',
  'cherry-pick'
];
const elementsForStatus = [
  'folder/file1',
  'folder/file2',
  'folder/file13',
  'folder/file4',
];

let addedFiles = []; 
let hasDisplayedStatusResult = false;


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('command-input');
  const command = input.value.trim();
  input.value = '';
  runCommand(command);
});

function runCommand(command) {
    const commandName = command.match(/^[\w-]+/)[0];
    if (validCommands.some(c => commandName === c)) {
      try {
        let result;
  
        if (command.startsWith('init')) {
          result = 'Création d\'un nouveau dépôt Git => créaation d\'un sous reperttoire .git, qui contient des sous répertoires pour des objets, des refs et des fichiers de modèle. Un fichier HEAD est également créé et pointe vers le commit actuellemnt extrait';
          document.getElementById('status-image').src = 'img/init.png';
          document.getElementById('status-image').style.display = 'block';
        } else if (command.startsWith('add')) {
          const filePath = command.split(' ')[1];
          if (elementsForStatus.includes(filePath)) {
            addedFiles.push(filePath);
            result = `Fichier ${filePath} ajouté avec succès. Vous pouvez faire un status pour voir la modification d'état`;
            document.getElementById('status-image').src = 'img/gitAdd.png';
            document.getElementById('status-image').style.display = 'block';
            document.querySelector('.text-list').classList.add('hide');
          } else {
            throw new Error('Vous n\'avez pas précisé quel fichier vous souhaitez ajouter, vous pouvez faire un status pour voir les fichiers modifiés');
          }
        } else if (command.includes('commit')) {
          result = 'Commit: capture un instantané des changements stagés du projet.Le commit s\'effectue dans le dépôt local. Il devra ensuite être push vers le dépôt distant. Il existe différentes options : commit -v: affiche les différences entre l\index et le fichier modifié dans le message de commit; commit -m: permet de spécifier un message de commit; commit --amend: modifier le commit précédentcommit -a: ajoute automatiquement tous les fichiers modifié à l\index avant de commiter (ne fonctionne pas pour les nouveaux fichiers => pas encore indexés)';
          document.getElementById('status-image').src = 'img/commit.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('push')) {
          result = 'Push: pousser les modifications locales effectuées sur une branche dans le référentiel distant';
          document.getElementById('status-image').src = 'img/push.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('branch')) {
          result = 'Branch: visualiser la liste des branches existantes dans un dépôt Git local. git branch -r, elle affichera les branches distantes suivies par votre dépôt local. Si vous utilisez la commande git branch -a, elle affichera toutes les branches, locales et distantes';
          document.getElementById('status-image').src = 'img/branch.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('merge')) {
          result = 'Merge: fusionner une branche dans une autre branche.';
          document.getElementById('status-image').src = 'img/merge.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('cherry-pick')) {
          result = 'Cherry-pick: sélectionner un ou plusieurs commits spécifiques à partir d\'une branche différente et de les appliquer sur la branche actuelle';
          document.getElementById('status-image').src = 'img/cherrypick.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('checkout')) {
          result = 'Checkout: se déplacer dans une branche spécifique ou de passer d\'une branche à une autre. Elle peut également être utilisée pour passer d\'une branche à un commit spécifique ou pour récupérer un fichier spécifique d\'une branche ou d\'un commit.';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('rebase')) {
          result = 'Rebase: copier les commits d\'une branche (par exemple une branche de fonctionnalité) sur une autre branche (par exemple la branche principale), puis réappliquer les modifications de ces commits un par un sur la nouvelle base. Cela peut être utile pour garder l\'historique de commits linéaire, pour éviter les commits de fusion supplémentaires qui peuvent rendre l\'historique difficile à lire et à suivre. bLa commande pour effectuer un rebase est git rebase <branche-source> <branche-cible>.Le rebase peut créer des conflits si deux commits modifient les mêmes fichiers aux mêmes endroits';
          document.getElementById('status-image').src = 'img/rebase.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('pull')) {
          result = 'Pull: récupère les modifications d\'une branche distante, fusionne ces modifications avec votre branche locale. Si Git detecte des conflits entre les deux branches il vous demandera de les résoudre avant de terminer la fusion des deux. Il existe différentes options : Pull--rebase : cela réorganise les modifications locales que vous avez effectuées par rapport à la version distante pour que les modifications se trouvent en haut de l\'historique des modifications. Cela peut être utile pour garder l\'historique des modifications propre et facile à suivre. ;Pull--no-rebase : cela empêche Git de réorganiser les modifications locales et laisse l\historique des modifications tel qu\'il est. Cela peut être utile si vous souhaitez conserver l\'historique des modifications dans l\'ordre dans lequel elles ont été effectuées';
          document.getElementById('status-image').src = 'img/pull.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('clone')) {
          result = 'Clone: cloner ou copier un dépôt existant dans un nouveau répertoire et un autre emplacement.';
          document.getElementById('status-image').src = 'img/clone.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('reset')) {
          result = 'Reset: permet de défaire des changements dans un commit. Elle peut être utilisée pour annuler un commit précédent, pour supprimer des modifications locales avant de les ajouter, pour enlever un fichier de l\'index ou pour revenir à un état précédent dans l\'historique.  --soft : annule le commit mais laisse les changements dans l\'index (zone de staging), ce qui permet de les modifier ou de les ajouter à un nouveau commit.\n --mixed : annule le commit et retire les changements de l\'index, mais laisse les modifications dans le répertoire de travail, ce qui permet de les réindexer et de les modifier avant de les ajouter à un nouveau commit.\r\n --hard : annule le commit et supprime tous les changements du répertoire de travail, ce qui permet de revenir à l\'état précédent de l\'historique sans conserver les modifications effectuées depuis';
          document.getElementById('status-image').src = 'img/reset.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command.startsWith('revert')) {
          result = 'Revert: annuler un ou plusieurs commits spécifiques. Cela signifie que le commit en question reste dans l\'historique des versions, mais que les modifications apportées dans ce commit sont inversées. Cette commande crée également un nouveau commit pour enregistrer l\'inversion. Il existe différentes options: revert --no-commit : annule le commit sans créer un nouveau commit (a valider manuellement);';
          document.getElementById('status-image').src = 'img/revert.png';
          document.getElementById('status-image').style.display = 'block';
          document.querySelector('.text-list').classList.add('hide');
          
        } else if (command.startsWith('log')) {
          result = 'Historique des commits : ...';
          document.querySelector('.text-list').classList.add('hide');
        } else if (command === 'status') { 
          const resultContainer = document.createElement('div'); 
          resultContainer.style.color = 'red'; 
  
          elementsForStatus.forEach((element) => { 
            const elementParagraph = document.createElement('p'); 
            elementParagraph.textContent = element; 
            if (addedFiles.includes(element)) {
              elementParagraph.style.color = 'green';
            }
            resultContainer.appendChild(elementParagraph); 
          });
  
          output.appendChild(resultContainer); 
          hasDisplayedStatusResult = true;
        }

      if (result) { 
        displayResult(result);
        if (command === 'status' && !hasDisplayedStatusResult) { 
          const resultContainer = document.createElement('div'); 
          resultContainer.style.color = 'green'; 
          addedFiles.forEach((file) => {
            if (elementsForStatus.includes(file)) { 
              const fileParagraph = document.createElement('p'); 
              fileParagraph.textContent = file; 
              resultContainer.appendChild(fileParagraph); 
            }
          });
          output.appendChild(resultContainer); 
          hasDisplayedStatusResult = true; 
        }
      }
    } catch (error) {
      displayError(error);
    }
  } else {
    displayError(new Error(`La commande "${command}" n'est pas reconnue dans ce cadre. RDV sur la documentation de GIT pour plus d'informations.`));
  }
}

const output = document.getElementById('output');
const MAX_OUTPUT_LENGTH = 1;

function displayResult(result) {
    const resultParagraph = document.createElement('p');
    resultParagraph.textContent = result;
    if (result.startsWith('Erreur')) {
        resultParagraph.style.color = 'red';
    }
    output.appendChild(resultParagraph);

    if (output.childNodes.length > MAX_OUTPUT_LENGTH) {
        for (let i = 0; i < output.childNodes.length - MAX_OUTPUT_LENGTH; i++) {
            output.removeChild(output.firstChild);
        }
    }
}

function displayError(error) {
    const errorParagraph = document.createElement('p');
    errorParagraph.textContent = error.message;
    errorParagraph.classList.add('error');
    output.appendChild(errorParagraph);

    if (output.childNodes.length > MAX_OUTPUT_LENGTH) {
        for (let i = 0; i < output.childNodes.length - MAX_OUTPUT_LENGTH; i++) {
            output.removeChild(output.firstChild);
        }
    }
}
function showImage() {
    var textInput = document.getElementById("command-input");
    var myImage = document.getElementById("status-image");
    
    myImage.style.display = "block";
    
    textInput.addEventListener("input", function() {
      myImage.style.display = "none";
    });
  }
  


