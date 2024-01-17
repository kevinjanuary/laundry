import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const UserDashboardPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/masuk");
  }

  const products = await db.product.findMany();

  return (
    <div className="space-y-4">
      <span className="text-lg">
        Hai {session.user?.name}, Mau laundry apa hari ini?
      </span>

      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <Link key={product.id} href={`/dashboard/${product.id}/order`}>
            <div className="border-2 rounded-lg flex items-center gap-4 p-2">
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="w-16 aspect-square object-cover rounded-md"
              />
              <span>{product.name}</span>
              <ChevronRightIcon className="ml-auto" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;
