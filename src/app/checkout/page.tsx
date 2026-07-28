import ProductList from "@/components/ProductList";

const Page = () => {

  return (
    <main className="flex flex-1 w-full max-w-4xl mx-auto flex-col items-center justify-between py-[4rem] px-[2rem] bg-white dark:bg-black">
      <div className="grid gap-y-[.5rem] mx-auto">
        <fieldset className="my-[.5rem]" id="purchase">
          <legend className="text-xl font-semibold mb-[.5rem]">order details</legend>
          <ProductList operatableQuantity={false}/>
        </fieldset>
        <fieldset className="my-[.5rem]" id="purchase">
          <legend className="text-xl font-semibold">shipping address</legend>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>nation</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>first name</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>last name</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>post address</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>prefecture</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>city</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>route</label>
            <input className="border border-gray-200" type="text" required/>
          </div>
          <div className="flex grid md:grid-flow-col md:gap-x-[.5rem] md:justify-between mt-[.5rem]">
            <label>room number</label>
            <input className="border border-gray-200" type="text"/>
          </div>
        </fieldset>
        <fieldset className="my-[.5rem]">
          <legend className=" text-xl font-semibold mb-[.5rem]">pay method</legend>
          <div>
            <input className="mr-[.5rem]" name="payment method" type="radio" value="credit card"/>
            <label htmlFor="">credit caard</label>
          </div>
          <div>
            <input className="mr-[.5rem]" name="payment method" type="radio" value="google pay"/>
            <label htmlFor="">google pay</label>
          </div>
          <div>
            <input className="mr-[.5rem]" name="payment method" type="radio" value="apple pay"/>
            <label htmlFor="">apple pay</label>
          </div>
          <div>
            <input className="mr-[.5rem]" name="payment method" type="radio" value="cash"/>
            <label htmlFor="">cash</label>
          </div>
        </fieldset>
        <form id="purchase" /* action="/" method="POST" */>
          <input type="submit" className="text-center bg-gray-300 py-[.5rem] px-[1rem]" value="purchase"/>
        </form>
      </div>
    </main>
  );
}

export default Page;