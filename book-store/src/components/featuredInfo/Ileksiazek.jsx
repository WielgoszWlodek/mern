
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import useFetch from "../../hooks/useFetch";

export default function Ileksiazek() {

    const { data, loading, error } = useFetch(
        "/books/find/countByBooks"
      );

      return (
        <div>
     <div>
         <span className="featuredTitle">Książki:   <span className="featuredMoney">{data[0]?.count}</span></span>
        </div>
     </div>
      );
    }