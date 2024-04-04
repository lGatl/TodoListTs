import React from "react";

type Props = {
  titre: string;
  changeTitre: (e: any) => any;
};
/**
 * Composant affichant le formulaire de saisie de nouvelles taches
 * Il est controlé par son parent TodoList
 *
 */
const SetTodo: React.FC<Props> = ({ titre, changeTitre }) => {
  return <input value={titre} onChange={(e) => changeTitre(e.target.value)} />;
};
export default SetTodo;
