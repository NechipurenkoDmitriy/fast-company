// export const usersHeaderRow = [
//   { key: 'name', text: 'Имя' },
//   { key: 'qualities', text: 'Качества' },
//   { key: 'profession', text: 'Профессия' },
//   { key: 'completedMeetings', text: 'Встретился, раз' },
//   { key: 'rate', text: 'Оценка' },
//   { key: 'deleteKey', text: '' },
// ];

//   const renderUsersTable = () => {
//     const usersThead = usersHeaderRow;

//     const renderTh = (innerHTML, uniqueKey = innerHTML) => {
//       return (
//         <th scope="col" key={uniqueKey}>
//           {innerHTML}
//         </th>
//       );
//     };

//     const renderQualities = (user) => {
//       return user.qualities.map((quality) => (
//         <div key={quality._id} className={`badge bg-${quality.color} m-1`}>
//           {quality.name}
//         </div>
//       ));
//     };

//     const renderTheadRow = () => {
//       return usersThead.map((column) => renderTh(column.text));
//     };

//     const renderUserRow = (user) => {
//       return usersThead.map((column) => {
//         const defKey = column.key;

//         switch (defKey) {
//           case 'profession':
//             return renderTh(user[defKey].name);
//           case 'qualities':
//             return renderTh(renderQualities(user), defKey);
//           case 'rate':
//             return renderTh(`${user[defKey]}/5`, defKey);
//           case 'deleteKey':
//             return renderTh(
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDelete(user._id)}
//               >
//                 Delete
//               </button>,
//               defKey
//             );
//           default:
//             return renderTh(user[defKey], defKey);
//         }
//       });
//     };

//     return (
//       <table className="table">
//         <thead>
//           <tr>{renderTheadRow()}</tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>{renderUserRow(user)}</tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };
