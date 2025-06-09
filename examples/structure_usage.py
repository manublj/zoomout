# c:\local\SOFTWARE_DEV\current\zoomout\zoomout_v1\examples\structure_usage.py

from models.structures import StructureRepository

def main():
    repo = StructureRepository()
    
    # Get a specific structure
    structure = repo.get_by_id("STR-CVD-01")
    print(f"Found structure: {structure.structure_name}")
    
    # Get all Political Superstructures
    political_structures = repo.get_by_type("Political Superstructure")
    print(f"Found {len(political_structures)} political structures")
    
    # Get structures from 1990-1995
    structures_90s = repo.get_by_date_range(1990, 1995)
    print(f"Found {len(structures_90s)} structures from early 90s")

if __name__ == "__main__":
    main()