import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">
        {!props.spots && <span>no spots remaining</span>}
        {props.spots === 1 && <span>1 spot remaining</span>}
        {props.spots > 1 && <span>{props.spots} spots remaining</span>}
      </h3>
    </li>
  );
}