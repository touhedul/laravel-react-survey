import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


export default function Pagination({ meta, changePaginatedData }) {

   const onLinkClick = (e, link) => {
      e.preventDefault();
      if (!link.url) {
         return;
      }
      changePaginatedData(link.url);
   }
   return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" >
         <div className="flex flex-1 justify-between sm:hidden">
            {meta.links && meta.links[0].url != null ? (
               <a
                  href=""
                  onClick={e => onLinkClick(e, meta.links[0])}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
               >
                  Previous
               </a>
            ) : ''}
            {meta.links && meta.links[meta.links.length - 1].url != null ? (
               <a
                  href=""
                  onClick={e => onLinkClick(e, meta.links[meta.links.length - 1])}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
               >
                  Next
               </a>
            ) : ''}
         </div>
         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
               <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                  <span className="font-medium">{meta.total}</span> results
               </p>
            </div>
            <div>
               <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">

                  {meta.links && meta.links.map((link) => {
                     return (

                        <a dangerouslySetInnerHTML={{ __html: link.label }} href=''
                           onClick={e => onLinkClick(e, link)}
                           className={"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 " + (link.active ? 'bg-indigo-600 ' : '') + (link.url ? '' : 'cursor-not-allowed')}
                        >
                        </a>
                     )
                  })}
               </nav>
            </div>
         </div>
      </div >
   )
}
