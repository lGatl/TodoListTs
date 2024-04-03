import React from 'react';
// On crée le type d'une tache
type TodoType = {
    id:string
    titre:string
    estTerminee:boolean
}
// Le type de tache est étendu pour contenir le callback de control de la checkbox
interface Props extends TodoType {
    changeEstTerminee:(id: string, value: boolean) => void
}

/**
 * Composant d'affichage des Todos
 * Il contient le checkbox pour noter que la tache est terminée
 * Le checkbox est controlé par son parent
 */
const Todo: React.FC<Props> = ({
        id,
        titre,
        estTerminee,
        changeEstTerminee
    })=>{
  return (
    <li>
        {titre}
        <input
            type='checkbox'
            checked={estTerminee}
            onChange={e => changeEstTerminee(id,e.target.checked)}
        />
    </li>
  );
}

export {Todo}
// On exporte le TodoType pour définir dans le parent, le type du store
export type {TodoType}
