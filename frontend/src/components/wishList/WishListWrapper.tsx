import WishListItem from "./WishListItem"
import { AiOutlineHeart } from "react-icons/ai"
import WishEmpty from "./WishEmpty"
import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import { getUserWishList } from "../../utils/api/userWishListApi"

const WishListWrapper = () => {
  const { user } = useAuth()
  const { data: userWishList } = useQuery({
    queryKey: ["userWishList", user?.id],
    queryFn: () => getUserWishList(user?.id as string),
    enabled: !!user?.id,
  })
  console.log(userWishList)
  return (
    userWishList && (
      <div className="w-full h-full flex flex-col justify-center items-center my-12">
        <h2 className="text-4xl capitalize font-bold ">wishlist</h2>
        <p>You have {userWishList.length} items in your list!</p>
        {userWishList.length > 0 ? (
          userWishList.map((wishItem: any) => (
            <WishListItem key={wishItem.id} {...wishItem} />
          ))
        ) : (
          <>
            <div className="text-6xl">
              <AiOutlineHeart className="opacity-10 mx-auto" />
            </div>
            <WishEmpty />
          </>
        )}
      </div>
    )
  )
}
export default WishListWrapper
