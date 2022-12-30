import { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/variables";

const Container = styled.div`
  min-width: 40vw;
  height: 50px;
  margin: auto 0;
  line-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(229, 232, 235);
  border-radius: 10px;
  padding: 5px 5px 5px 16px;
  @media screen and (max-width: 600px) {
    min-width: 60%;
  }
`;

const Search = styled.input`
  width: 100%;
  display: flex;
  border: none;
  outline: none;
  height: 45px;
  padding-left: 10px;
  font-size: 16px;
  color: #777;
`;

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: any) => {
    if (e.target.placeholder !== "검색") {
      setClick(false);
    } else {
      click ? setClick(false) : setClick(true);
    }
  };
  const handleTyping = (e: any) => {
    setSearch(e.target.value);
  };

  const clearText = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
      setSearch("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Container onClick={handleClick}>
      <FaSearch color={colors.gray} size="20" />
      <Search ref={searchRef} onChange={handleTyping} placeholder="검색" />
      {search.length > 0 ? (
        <MdClear
          onClick={clearText}
          size="20"
          color="gray"
          style={{ cursor: "pointer" }}
        />
      ) : null}
    </Container>
  );
};

export default SearchBar;
