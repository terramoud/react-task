import MyInput from "./UI/input/MyInput";
import {MySelect} from "./UI/select/MySelect";

export const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                type="text"
                value={filter.searchQuery}
                onChange={e => setFilter({...filter, searchQuery: e.target.value})}
                placeholder="Search by title"
            />
            <MySelect
                value={filter.sortBy}
                onChange={(sortType) => setFilter({...filter, sortBy: sortType})}
                defaultValue={"Сортування"}
                options={[
                    {value: 'title', name: 'По назві'},
                    {value: 'body', name: 'По опису'}
                ]}
            />
        </div>
    )
}