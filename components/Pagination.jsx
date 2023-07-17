"use client";
import { useRouter } from "next/navigation";
const Pagination = ({ pagee, limit, Navito }) => {
  const router = useRouter();
  const numberpage = +limit;
  let pagelist = [];
  for (let i = 0; i < numberpage; i++) {
    pagelist.push(i + 1);
  }
  const pageaf = pagelist.length - pagee;
  const Nav = (e) => {
    router.push(`${Navito}&page=${e.target.textContent}`);
  };
  const NavBF = (e) => {
    router.push(`${Navito}&page=${pagee - 1}`);
  };
  const Nav1 = (e) => {
    router.push(`${Navito}&page=1`);
  };
  const NavLT = (e) => {
    router.push(`${Navito}&page=${numberpage}`);
  };
  const NavNX = (e) => {
    router.push(`${Navito}&page=${+pagee + 1}`);
  };
  return (
    <div className="px-4 py-10">
      <div className="flex justify-center w-full py-1 text-xs text-center text-primary-500">
        {pagee} / {Math.ceil(limit)}
      </div>
      <div className="flex items-center justify-center lg:px-0 sm:px-6">
        <div className="flex items-center justify-between w-full border-t lg:w-3/5 border-primary-500">
          {pagee == 1 ? (
            <div className="flex items-center pt-3 text-secondary-700">
              <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.1665 4L4.49984 7.33333"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.1665 4.00002L4.49984 0.666687"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="ml-3 text-sm font-medium leading-none ">Previous</p>
            </div>
          ) : (
            <div
              onClick={NavBF}
              className="flex items-center pt-3 cursor-pointer text-secondary-600 hover:text-secondary-700">
              <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.1665 4L4.49984 7.33333"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.1665 4.00002L4.49984 0.666687"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="ml-3 text-sm font-medium leading-none ">Previous</p>
            </div>
          )}
          <div className="hidden sm:flex">
            {pagee > 9 && (
              <p className={`text-sm font-medium leading-none cursor-pointer text-secondary-700  pt-3 mr-4 px-2`}>
                ...
              </p>
            )}
            {pagelist.map((e, i) => {
              if (pagee < 10) {
                if (i < 18)
                  return (
                    <p
                      id={e}
                      key={e}
                      onClick={Nav}
                      className={
                        e == pagee
                          ? "text-sm font-medium leading-none cursor-pointer text-primary-500  border-t  border-primary-500 pt-3 mr-4 px-2"
                          : `text-sm font-medium leading-none cursor-pointer text-secondary-700 hover:text-primary-500 border-t border-transparent hover:border-primary-500 pt-3 mr-4 px-2`
                      }>
                      {e}
                    </p>
                  );
              } else {
                if (Math.abs(pagee - (i + 1)) < 8) {
                  return (
                    <p
                      id={e}
                      key={e}
                      onClick={Nav}
                      className={
                        e == pagee
                          ? "text-sm font-medium leading-none cursor-pointer text-primary-500  border-t  border-primary-500 pt-3 mr-4 px-2"
                          : `text-sm font-medium leading-none cursor-pointer text-secondary-700 hover:text-primary-500 border-t border-transparent hover:border-primary-500 pt-3 mr-4 px-2`
                      }>
                      {e}
                    </p>
                  );
                }
              }
            })}
            {pageaf > 10 && (
              <p className={`text-sm font-medium leading-none cursor-pointer text-secondary-700  pt-3 mr-4 px-2`}>
                ...
              </p>
            )}
          </div>
          {pagee == numberpage || pagelist.length === 1 ? (
            <div className="flex items-center pt-3 text-secondary-700 ">
              <p className="mr-3 text-sm font-medium leading-none">Next</p>
              <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 7.33333L12.8333 4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 0.666687L12.8333 4.00002"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div
              onClick={NavNX}
              className="flex items-center pt-3 cursor-pointer text-secondary-600 hover:text-secondary-700">
              <p className="mr-3 text-sm font-medium leading-none">Next</p>
              <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 7.33333L12.8333 4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 0.666687L12.8333 4.00002"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
