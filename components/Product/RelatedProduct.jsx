import Image from "next/image";
import { useRouter } from "next/navigation";

const RelatedProduct = ({ data }) => {
  const router = useRouter();
  console.log(data);

  return <div>RelatedProduct</div>;
};

export default RelatedProduct;
