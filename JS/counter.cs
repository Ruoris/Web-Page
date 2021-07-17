

void main()
{


    for (int yksi = 0; yksi < 6; yksi++)
    {
        string list = "000000";
        for (int kaksi = 0; kaksi < 6; kaksi++)
        {
            for (int kolme = 0; kolme < 6; kolme++)
            {
                for (int neljä = 0; neljä < 6; neljä++)
                {
                    for (int viisi = 0; viisi < 6; viisi++)
                    {
                        for (int kuusi = 0; kuusi < 6; kuusi++)
                        {
                            string one = '1';
                            list[yksi][kaksi][kolme][neljä][viisi][kuusi] = '1';
                            System.WriteLine(list);
                        }
                    }
                }
            }
        }

    }


}