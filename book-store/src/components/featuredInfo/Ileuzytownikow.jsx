
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import useFetch from "../../hooks/useFetch";

export default function Ileuzytowniow() {

    const { data, loading, error } = useFetch(
        "/users/find/countByUsers"
      );
//find/countByUsers
      
  return (
    <div>
 <div>
    <span className="featuredTitle">Czytelnicy:   <span className="featuredMoney">{data[0]?.count}</span></span>
    </div>
 </div>
  );
}