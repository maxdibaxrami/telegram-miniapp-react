import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BackMenu } from "@/Icons";
const TopBarPages = () => {
  const navigate = useNavigate();

  return (
    <Navbar disableAnimation className="text-default-600">
      <NavbarContent justify="start">
        <NavbarItem>
            <Button size="sm" onPress={()=> {navigate("/main?page=profile")}} isIconOnly aria-label="Like" color="primary">
              <BackMenu stroke="#FFF"/>
            </Button>
        </NavbarItem>

        <NavbarItem className="flex items-center justify-center">
          <p className="font-bold">Glow meet</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default TopBarPages;
